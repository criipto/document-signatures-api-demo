import {useState} from 'react';
import { GraphQLTaggedNode, useMutation, UseMutationConfig } from "react-relay";
import { MutationParameters, VariablesOf } from 'relay-runtime';

type Executor<T extends MutationParameters> = {
  execute: (variables : VariablesOf<T>) => void
  executePromise: (variables : VariablesOf<T>) => Promise<T["response"]>;
}
type State = {
  pending: boolean
  error: Error | null
  success: boolean
}

type Config<T extends MutationParameters> = {
  updater: UseMutationConfig<T>["updater"]
}

export default function useMutationExtra<T extends MutationParameters>(query : GraphQLTaggedNode, config?: Config<T>) : [Executor<T>, State] {
  const [commit, inFlight] = useMutation<T>(query);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const executePromise = (variables : VariablesOf<T>) => {
    return new Promise<T["response"]>((resolve, reject) => {
      commit({
        ...config,
        variables,
        onError: (error) => {
          setError(error);
          setSuccess(false);
          reject(error);
        },
        onCompleted: (response, errors) => {
          if (errors?.length) {
            const error = new Error(errors.map(error => error.message).join('\n'));
            setError(error);
            setSuccess(false);
            reject(error);
            return;
          }
          
          setError(null);
          setSuccess(true);
          resolve(response);
        }
      });
    });
  };

  const execute = (variables : VariablesOf<T>) => {
    executePromise(variables).catch(() => null);
  };

  return [{execute, executePromise}, {pending: inFlight, error, success}];
}