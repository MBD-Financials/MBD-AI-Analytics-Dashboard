import {
  NftDetailListLeft,
  NftDetailListText,
  NftDetailList,
  NftDetailListRight,
} from "Styles/nft_metadata";
import React from "react";

function NftDetailListContent({ label, text }) {
  return (
    <NftDetailList>
      <NftDetailListLeft>
        <NftDetailListText>{label}:</NftDetailListText>
      </NftDetailListLeft>
      <NftDetailListRight>
        <NftDetailListText>{text}</NftDetailListText>
      </NftDetailListRight>
    </NftDetailList>
  );
}

export default NftDetailListContent;
