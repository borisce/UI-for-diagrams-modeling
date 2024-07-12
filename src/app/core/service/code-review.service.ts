import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { CollabService } from "./collab.service";
import { Review } from "src/app/modules/editor/editor-component/editor-sidebar/code-review/code-review.component";
import { AuthenticationService } from "./authentication.service";

/**
 * Service to manage code reviews
 */
@Injectable({providedIn: "root"})
export class CodeReviewService {
  public editor: monaco.editor.IStandaloneCodeEditor | null = null;
  public reviews: { id: string; reviews: Review[] }[] = [];
  public openedFile: { id: string; reviews: Review[] } | null = null;
  public openedReview: Review | null = null;

  constructor(
    private http: HttpClient,
    private collabService: CollabService,
    private authService: AuthenticationService
  ) {
  }

  public async createCodeReview(message: string, selection: monaco.Selection) {
    return this.collabService.createCodeReview(message, selection, this.authService.currentUser.username);
  }

  public async createCodeReviewComment(reviewID: string, message: string) {
    return this.collabService.createCodeReviewComment(reviewID, message, this.authService.currentUser.username);
  }

  public async resolveReview(reviewID: string) {
    return this.collabService.resolveCodeReview(reviewID);
  }

  public setOpenedFile(id: string) {
    this.openedFile = this.reviews.find((review) => review.id === id) ?? null;
  }

  public setOpenedReview(id: string) {
    this.openedReview =
      this.openedFile?.reviews.find((review) => review.id === id) ?? null;
  }
}
