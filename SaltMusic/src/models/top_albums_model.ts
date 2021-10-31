// To parse this data:
//
//   import { Convert, TopAlbumsModel } from "./file";
//
//   const topAlbumsModel = Convert.toTopAlbumsModel(json);

export interface TopAlbumsModel {
    entry: Entry[];
}

export interface Author {
    name: Icon;
    uri: Icon;
}

export interface Icon {
    label: string;
}

export interface Entry {
    name: string;
    image: string;
    itemCount: string;
    price: string;
    // contentType: EntryIMContentType;
    rights: string;
    title: string;
    link: string;
    artist: string;
    // category: Category;
    releaseDate: string;
}

export interface Category {
    term: string;
    scheme: string;
    label: string;
}




export interface EntryIMContentType {
    contentType: string;
    attributes: string;
}



// Converts JSON strings to/from your types
export class Convert {
    public static toTopAlbumsModel(json: string): TopAlbumsModel {
        const obj = JSON.parse(JSON.stringify(json));
        // console.log(obj);
        let feeds: Entry[] = [];
        //obj["feed"]["entry"].length
        let entries = obj["feed"]["entry"]
        entries.forEach((element: any) => {

            let contentType: EntryIMContentType = {
                contentType: element["im:contentType"]["attributes"]["term"],
                attributes: element["im:contentType"]["attributes"]["label"]
            }
            let category: Category = {
                term: element["category"]["attributes"]["term"],
                scheme: element["category"]["attributes"]["scheme"],
                label: element["category"]["attributes"]["label"]

            }

            let entry: Entry = {
                name: element["im:name"]["label"],
                image: element["im:image"][2]["label"],
                itemCount: element["im:itemCount"]["label"],
                price: element["im:price"]["label"],
                // contentType: contentType,
                rights: element["rights"]["label"],
                title: element["title"]["label"],
                link: element["link"]["attributes"]["href"],
                artist: element["im:artist"]["label"],
                // category: category,
                releaseDate: element["im:releaseDate"]["attributes"]["label"]
            }
            // console.log(entry);
            feeds.push(entry);
        });

        const res: TopAlbumsModel = {
            // feed: feeds,
            entry: feeds,
        }
        // console.log(res);
        return res;
        // return JSON.parse(JSON.stringify(json));
    }

    public static topAlbumsModelToJson(value: TopAlbumsModel): string {
        return JSON.stringify(value);
    }
}


