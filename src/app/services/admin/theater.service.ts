import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TheaterService {
  constructor(private apollo: Apollo) {}
  CreateTheater(movie: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateTheater($input: TheaterInput!) {
          createTheater(input: $input) {
            id
            name
            location {
              address
              city
              state
              pinCode
            }
          }
        }
      `,
      variables: {
        input: {
          name: movie.name,
          location: {
            address: movie.address,
            city: movie.city,
            state: movie.state,
            pinCode: movie.pinCode,
          },
          adminEmail: movie.email,
        },
      },
    });
  }

  getTheater(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query Theaters {
          theaters {
            id
            name
            adminId {
              username
              email
            }
            location {
              city
            }
          }
        }
      `,
    }).valueChanges;
  }
  deleteTheater(theaterId: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteTheater($deleteTheaterId: ID!) {
          deleteTheater(id: $deleteTheaterId) {
            id
          }
        }
      `,
      variables: {
        deleteTheaterId: theaterId,
      },
    });
  }
}
