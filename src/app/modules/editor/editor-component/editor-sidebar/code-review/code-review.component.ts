import { Component, OnInit } from "@angular/core";
import { GitService } from "src/app/api/collab/services/git.service";
import {
  CollabService,
  getFileNameFromDocID,
} from "src/app/core/service/collab.service";
import { RepositoryService } from "src/app/core/service/repository.service";
import { EditorTabsService } from "../../editor-tabs/service/editor-tabs.service";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GithubService } from "src/app/core/service/github.service";
import { FileCode } from "../../editor-tabs/model/file-code/file-code";
import { EditorTileComponent } from "../../editor-tile/editor-tile.component";
import { ReviewBG } from "../../../review/review";
import { CodeReviewService } from "src/app/core/service/code-review.service";

export interface Review {
  id: string;
  message: string;
  created_at: Date;
  author_name: string;
  resolved: boolean;
  opened: boolean;
  comments: Comment[];
  selection: monaco.Selection;
}

@Component({
  selector: "code-review",
  templateUrl: "./code-review.component.html",
  styleUrls: ["./code-review.component.scss"],
})
export class CodeReviewComponent implements OnInit {
  public initialLoading: boolean = true;

  public commentForm: any;
  public comment: string = "";

  constructor(
    private collabService: CollabService,
    private editorTabsService: EditorTabsService,
    private formBuilder: UntypedFormBuilder,
    public codeReviewService: CodeReviewService
  ) {
    this.getCodeReviews();
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: [this.comment, Validators.required],
    });
  }

  public async onSubmit() {
    this.codeReviewService
      .createCodeReviewComment(
        this.codeReviewService.openedReview.id,
        this.commentForm.value.content
      )
      .then(() => {
        this.commentForm.reset();
        this.getCodeReviews();
      });
  }

  public async getCodeReviews() {
    const reviews = await this.collabService.getCodeReviews();

    this.codeReviewService.reviews = reviews?.map((review) => {
      const fileName = getFileNameFromDocID(review.id);

      return {
        id: review.id,
        unopened: Object.values(review.reviews)?.reduce(
          (acc, curr) => !curr.opened && acc + 1,
          0
        ),
        fileName,
        reviews: Object.keys(review.reviews)?.map((reviewID) => ({
          ...review.reviews[reviewID],
          id: reviewID,
        })).filter(review => !review.resolved),
      };
    });

    if (this.codeReviewService.openedFile) {
      this.codeReviewService.openedFile = this.codeReviewService.reviews?.find(
        (review) => review.id === this.codeReviewService.openedFile.id
      );
    }

    this.initialLoading = false;
  }

  public openFile(id: string) {
    if (this.codeReviewService.openedFile?.id === id)
      this.codeReviewService.openedFile = null;
    this.codeReviewService.openedFile = this.codeReviewService.reviews.find(
      (review) => review.id === id
    );

    // Opens tab in editor
    const tabTitle = getFileNameFromDocID(this.codeReviewService.openedFile.id);
    const tabPath = EditorTileComponent.getPathFromDataId(
      this.codeReviewService.openedFile.id
    );
    const fileCode = new FileCode(
      tabTitle,
      tabPath,
      this.codeReviewService.openedFile.id
    );

    this.editorTabsService.addTab(fileCode);
  }

  public openReview(reviewID: string) {
    const review = Object.values(
      this.codeReviewService.openedFile.reviews
    )?.find((review) => review.id === reviewID);

    if (!window.monaco)
      this.codeReviewService.editor.onDidChangeModel(() =>
        this.openReview(reviewID)
      );

    this.editorTabsService.decorations =
      this.codeReviewService.editor.deltaDecorations(
        this.editorTabsService.decorations,
        [
          {
            range: new monaco.Range(
              review.selection.selectionStartLineNumber,
              review.selection.selectionStartColumn,
              review.selection.positionLineNumber,
              review.selection.positionColumn
            ),
            options: {
              className: `new-code-review-block ${
                ReviewBG[
                  Object.keys(ReviewBG)[
                    Math.floor(Math.random() * Object.keys(ReviewBG).length)
                  ]
                ]
              }`,
            },
          },
        ]
      );

    this.codeReviewService.setOpenedReview(reviewID);
  }

  public resolveReview(reviewID: string) {
    this.codeReviewService.resolveReview(reviewID).then(() => {
      this.codeReviewService.openedReview = null;
      this.getCodeReviews();
    });
  }
}
