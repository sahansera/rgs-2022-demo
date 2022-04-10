import { Input } from "@mantine/core";
import { Search } from 'tabler-icons-react';

import { SearchClient, SearchIndexClient, SearchIndexerClient, AzureKeyCredential } from "@azure/search-documents";

const searchUrl = process.env.REACT_APP_SEARCH_URL || "";
const searchKey = process.env.REACT_APP_SEARCH_KEY || "";
const searchIndex = "posts"

const searchClient = new SearchClient(
  searchUrl,
  searchIndex,
  new AzureKeyCredential(searchKey)
);

export function SearchInput(): JSX.Element {
  function search(event: any) {
    if (event.key !== "Enter") { return; }

    console.log(event);
    searchClient.search("*").then(result => {
      console.log(result);
    });
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