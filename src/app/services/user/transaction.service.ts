import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private apollo: Apollo) {}

  transaction(data: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateTransaction($input: CreateTransactionInput!) {
          createTransaction(input: $input) {
            id
            amount
            paymentMethod
            status
          }
        }
      `,
      variables: {
        input: {
          amount: data.totalAmount,
          paymentMethod: 'CARD',
          status: 'COMPLETED',
          userCredential: {
            cardNumber: data.cardNumber,
            pin: data.pin,
            cvv: data.cvv,
          },
        },
      },
    });
  }
  reservation(data: any): Observable<any> {
     return this.apollo.mutate({
       mutation: gql`
         mutation Mutation($input: ReservationInput!) {
           createReservation(input: $input) {
             userId
             id
             showId
             transactionId
             qrTicket
             seatNumber
           }
         }
       `,
       variables: {
         input: {
           showId: data.showId,
           transactionId: data.transaction,
           seatNumber: data.seatNumber,
         },
       },
     });
  }
}
