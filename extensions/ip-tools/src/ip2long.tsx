import { IPv4, IPv6 } from "ip-toolkit";
import { useState } from "react";
import { List, Icon, Action, ActionPanel } from "@raycast/api";
import { drinkTypes, DrinkDropdown } from "./components/dropdown";

export default function Command(props: { arguments: { keywork: string } }) {
  const { keywork } = props.arguments;
  const [version, setVersion] = useState<string>("IPv4");
  const [searchText, setSearchText] = useState<string>(keywork ? keywork : "");

  const isEmpty = searchText.trim() === "";
  const isValid = isEmpty ? false : version === "IPv4" ? IPv4.isValidIP(searchText) : IPv6.isValidIP(searchText);
  const convertResult = isValid
    ? (version === "IPv4" ? IPv4.ip2long(searchText) : IPv6.ip2long(searchText)).toString()
    : "";

  return (
    <List
      throttle={true}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Input ip address that needs to be converted！"
      searchBarAccessory={<DrinkDropdown drinkTypes={drinkTypes} onDrinkTypeChange={setVersion} />}
    >
      {isEmpty ? (
        <List.EmptyView icon={Icon.Info} title="Please enter the ip address that needs to be converted！" />
      ) : !isValid ? (
        <List.EmptyView icon={Icon.Warning} title="Please enter a valid ip address！" />
      ) : (
        <List.Item
          icon={Icon.Clipboard}
          title={convertResult}
          subtitle={searchText}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={convertResult} />
            </ActionPanel>
          }
        />
      )}
    </List>
  );
}
