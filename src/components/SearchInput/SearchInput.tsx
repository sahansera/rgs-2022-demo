import { Input } from "@mantine/core";
import { Search } from 'tabler-icons-react';

import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchUrl = process.env.REACT_APP_SEARCH_URL || "";
const searchKey = process.env.REACT_APP_SEARCH_KEY || "";
const searchIndex = "posts"

// const searchClient = new SearchClient(
//   searchUrl,
//   searchIndex,
//   new AzureKeyCredential(searchKey)
// );

interface Props {
  onSearch: (query: string) => void;
}

export function SearchInput({ onSearch }: Props): JSX.Element {
  function search(event: any) {
    if (event.key !== "Enter") { return; }
    onSearch(event.target.value);
  }

  return (
    <Input
      icon={<Search size={16} />}
      placeholder="Search"
      rightSectionWidth={70}
      styles={{ rightSection: { pointerEvents: 'none' } }}
      onKeyDown={search}
    />
  )
}