import throttle from 'lodash/throttle';
import { useCallback, useEffect, useState } from "react";

const DEFAULT_THROTTLE_TIMEOUT = 200;
const DEFAULT_LIMIT = 10;
const DEFAULT_MIN_SYMBOLS = 3;
export const useAutocomplete = (
  fetch: (text: string, limit?: number) => Promise<string[]>,
  inputValue: string | null
) => {
  const [values, setValues] = useState<string[]>([]);

  const fetcher = useCallback(
    throttle<any>(
      (value: string) =>
        fetch(value ?? '', DEFAULT_LIMIT).then((x) => {
          setValues(x);
        }),
      DEFAULT_THROTTLE_TIMEOUT
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValues]
  );

  useEffect(() => {
    const length = inputValue?.length ?? 0;
    if (length >= DEFAULT_MIN_SYMBOLS) {
      fetcher(inputValue);
    }
  }, [inputValue, fetcher]);

  return values;
};
