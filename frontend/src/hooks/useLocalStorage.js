export function useLocalStorage(props) {
  const data = localStorage.getItem(props);
  return data;
}
