import { atom } from "recoil";

const atomGameNewsList = atom({
    key: "atomGameNewsList",
    default: []
});

export default atomGameNewsList;