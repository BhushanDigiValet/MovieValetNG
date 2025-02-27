import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloClientOptions } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

const uri = 'http://localhost:4000/graphql'; // Your Apollo Server URL

export function createApollo(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  const platformId = inject(PLATFORM_ID); // Inject PLATFORM_ID inside the function

  // Attach Authorization token from localStorage
  const authLink = setContext((_, { headers }) => {
    if (isPlatformBrowser(platformId)) {
      const token = localStorage.getItem('token'); // ✅ Retrieve from localStorage

      console.log('Retrieved Token:', token); // Debugging

      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    }

    return { headers };
  });

  return {
    link: authLink.concat(httpLink.create({ uri, withCredentials: true })), // ✅ Chain authLink before httpLink
    cache: new InMemoryCache(),
  };
}

export const apolloProviders = [
  provideHttpClient(withFetch()),
  provideApollo(createApollo),
];
