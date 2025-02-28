import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { User } from '../../pages/admin/user/user.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUsers(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query GetUsers {
          users {
            id
            username
            role
            email
            cityId {
              name
            }
          }
        }
      `,
    }).valueChanges;
  }

  login(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            token
          }
        }
      `,
      variables: {
        input: {
          email,
          password,
        },
      },
      context: {
        withCredentials: true,
      },
    });
  }

  register(user: User): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation Register($input: RegisterInput!) {
          register(input: $input) {
            id
            username
            email
            role
            cityId {
              name
            }
          }
        }
      `,
      variables: {
        input: {
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
          cityName: user.city,
        },
      },
    });
  }

  updateUser(userId: string, userData: Partial<User>): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateUser($updateUserId: ID!, $input: UpdateUserInput!) {
          updateUser(id: $updateUserId, input: $input) {
            id
            username
            role
            email
          }
        }
      `,
      variables: {
        updateUserId: userId,
        input: {
          username: userData.username,
          email: userData.email,
          role: userData.role,
        },
      },
    });
  }
}
