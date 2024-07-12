import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UUID } from "antlr4ts/misc/UUID";
import { RepositoryService } from "./repository.service";

@Injectable({
  providedIn: "root",
})
export class EducationService {
  constructor(
    private httpClient: HttpClient,
    private repositoryService: RepositoryService
  ) {}

  /**
   * Get all classrooms in DB
   */
  public getAllClassroomsAdmin(): any {
    return this.httpClient.get(environment.baseUrl + "/edu/classrooms/all");
  }

  /**
   * Get all assigned classrooms
   * @param pageIndex - paginators pageindex
   * @param pageSize - paginators pagesize
   * @returns
   */
  public getAllClassrooms(pageIndex: number, pageSize: number): any {
    const params = new HttpParams()
      .set("page", pageIndex.toString())
      .set("size", pageSize.toString());

    return this.httpClient.get(environment.baseUrl + "/edu/classrooms", {
      params: params,
    });
  }

  /**
   * Create new classroom
   */
  public createNewClassroom(requestBody: any) {
    return this.httpClient.post(
      environment.baseUrl + "/edu/classrooms/create",
      requestBody
    );
  }

  /**
   * Join an existing classroom
   * @param slug - Classroom's slug
   * @param password - Classroom's password
   * @returns
   */
  public joinClassroom(slug: string, password: string) {
    const requestBody = {
      slug: slug,
      password: password,
    };

    return this.httpClient.post(
      environment.baseUrl + "/edu/classrooms/join",
      requestBody
    );
  }

  /**
   * Get classroom details
   * @param uuid - Classroom identifier string
   * @returns
   */
  public getClassroomDetails(uuid: UUID) {
    return this.httpClient.get(environment.baseUrl + `/edu/classrooms/${uuid}`);
  }

  /**
   * Locks the ability to join the classroom
   * @param uuid - Classroom identifier string
   * @returns
   */
  public lockClassroom(uuid: UUID) {
    return this.httpClient.post(
      environment.baseUrl + `/edu/classrooms/${uuid}`,
      null
    );
  }

  /**
   * Update classroom details
   * @param uuid - Classroom identifier string
   * @param name - Classroom name
   * @param slug - Classroom slug
   * @param password - Classroom password
   * @returns
   */
  public updateClassroom(
    uuid: UUID,
    name: string,
    slug: string,
    password: string
  ) {
    const requestBody = {
      name: name,
      slug: slug,
      password: password,
    };

    return this.httpClient.put(
      environment.baseUrl + `/edu/classrooms/${uuid}`,
      requestBody
    );
  }

  /**
   * Delete a classroom
   * @param uuid - Classroom identifier string
   * @returns
   */
  public deleteClassroom(uuid: UUID) {
    return this.httpClient.delete(
      environment.baseUrl + `/edu/classrooms/${uuid}`
    );
  }

  /**
   * Get all classroom members
   * @param uuid - Classroom identifier string
   * @param pageIndex - Pagination page
   * @param pageSize - Pagination batch size
   * @returns
   */
  public getClassroomMembers(uuid: UUID): any {
    return this.httpClient.get(
      environment.baseUrl + `/edu/classrooms/${uuid}/members`
    );
  }

  /**
   * Add a teacher
   * @param uuid - Classroom identifier string
   * @param email - Teacher email
   * @returns
   */
  public addTeacher(uuid: UUID, email: string) {
    const requestBody = {
      email: email,
    };

    return this.httpClient.post(
      environment.baseUrl + `/edu/classrooms/${uuid}/members`,
      requestBody
    );
  }

  /**
   * Remove a classroom members
   * @param classroom_uuid - Classroom identifier string
   * @param member_uuid - User identifier string
   * @returns
   */
  public deleteClassroomMember(classroom_uuid: UUID, member_uuid: UUID) {
    return this.httpClient.delete(
      environment.baseUrl +
        `/edu/classrooms/${classroom_uuid}/members/${member_uuid}`
    );
  }

  /**
   * Get all classroom assignments - according to ownership and permissions
   * @param classroomUuid - Classroom identifier string
   * @param pageIndex - Pagination page
   * @param pageSize - Pagination batch size
   * @returns
   */
  public getAllClassroomAssignments(classroomUuid: UUID) {
    return this.httpClient.get(
      environment.baseUrl + `/edu/classrooms/${classroomUuid}/assignments`
    );
  }

  /**
   * Add an assignment
   * @param uuid - Classroom identifier string
   * @param name - Assignment name
   * @param uri - Assignment uri
   * @param dueDate - Assignment due date
   * @returns
   */
  public createNewAssignment(classroomUuid, form) {
    return this.httpClient.post(
      environment.baseUrl + `/edu/classrooms/${classroomUuid}/assignments`,
      form
    );
  }

  public createAssignmentDescription(classroomUuid, file, assignmentUuid) {
    return this.httpClient.post(
      environment.baseUrl +
        `/edu/classrooms/${classroomUuid}/description/${assignmentUuid}`,
      file
    );
  }

  public getAssignmentDescription(
    assignmentUuid,
    assignmentUserUuid = "empty"
  ) {
    return this.httpClient.get(
      environment.baseUrl +
        `/edu/classrooms/${assignmentUuid}/description/${assignmentUserUuid}`,
      { responseType: "blob" }
    );
  }

  public publishAssignment(
    classroomUuid: UUID,
    assignmentUuid: string,
    publishStatus: boolean
  ) {
    return this.httpClient.post(
      environment.baseUrl +
        `/edu/classrooms/${classroomUuid}/assignments/${assignmentUuid}`,
      publishStatus
    );
  }

  public updateAssignment(
    classroomUuid: UUID,
    assignmentUuid: string,
    requestBody: any
  ) {
    return this.httpClient.put(
      environment.baseUrl +
        `/edu/classrooms/${classroomUuid}/assignments/${assignmentUuid}`,
      requestBody
    );
  }

  public deleteAssignment(classroomUuid: UUID, assignmentUuid: string) {
    return this.httpClient.delete(
      environment.baseUrl +
        `/edu/classrooms/${classroomUuid}/assignments/${assignmentUuid}`
    );
  }

  public getOwnerClassrooms(ownerUsername: string) {
    return this.httpClient.get(
      environment.baseUrl + `/edu/classrooms/admin/owner/${ownerUsername}`
    );
  }

  public getAssignmentDetails(assignmentUuid: UUID) {
    return this.httpClient.get(
      environment.baseUrl + `/edu/classrooms/assignment-user/${assignmentUuid}`
    );
  }

  public getAssignmentUsers(assignmentUuid: UUID) {
    return this.httpClient.get(
      environment.baseUrl + `/edu/classrooms/assignment-users/${assignmentUuid}`
    );
  }

  public getAssignmentUsersByClassroom(classroomUuid: UUID) {
    return this.httpClient.get(
      environment.baseUrl + `/edu/classrooms/${classroomUuid}/assignment-users`
    );
  }

  public updateAssignmentUser(assignmentUserUuid, points) {
    let requestBody = {
      descriptionPoints: points.descriptionPoints,
      simulationPoints: points.simulation,
      synthesisPoints: points.synthesis,
      codePoints: points.code,
    };
    return this.httpClient.post(
      environment.baseUrl +
        `/edu/classrooms/assignment-user/${assignmentUserUuid}`,
      requestBody
    );
  }
}
