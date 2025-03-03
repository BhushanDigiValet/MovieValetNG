import { Injectable, input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Show } from '../../pages/theater-admin/theater-admin.component';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  constructor(private apollo: Apollo) {}

  getTheater(adminId: string): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query Theaters($adminId: ID) {
          theaters(adminId: $adminId) {
            name
            id
            location {
              address
              city
              state
              pinCode
            }
            adminId {
              id
              username
              email
            }
          }
        }
      `,
      variables: {
        adminId,
      },
    }).valueChanges;
  }
  getShows(theaterId: string): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query Shows($theaterId: ID) {
          shows(theaterId: $theaterId) {
            id
            showStartTime
            showEndTime
            amount
            movieId {
              title
              id
            }
          }
        }
      `,
      variables: {
        theaterId,
      },
    }).valueChanges;
  }
  createShow(showData: Show): Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateShow($input: CreateShowInput!) {
          createShow(input: $input) {
            id
            showEndTime
            showStartTime
            movieId {
              title
              id
            }
            amount
          }
        }
      `,
      variables: {
        input: {
          showStartTime: showData.showStartTime,
          showEndTime: showData.showEndTime,
          amount: showData.amount,
          movieName: showData.title,
          theaterName: showData.theater,
        },
      },
    });
  };
}
