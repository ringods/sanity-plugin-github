import GistInput from "../components/GistInput";

export type Gist = {
    _type: string;
    _key?: string;
    _version: number;
    id: string;
    file: string;
};

export default {
    name: 'github.gist',
    title: 'Gist',
    description: 'Gist',
    type: 'object',
    fields: [
        {
            type: 'string',
            name: 'id',
            description: 'ID of the Github Gist'
        },
        {
            type: 'string',
            name: 'file',
            description: 'File to select of a multi-file Gist'
        },
    ],
    inputComponent: GistInput, // - https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/code-input/src/schema.tsx#L15
    preview: { //- https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/code-input/src/schema.tsx#L45-L64
        select: {
            id: 'id',
            file: 'file'
        }
    }
};

// docs
// https://www.sanity.io/docs/previews-list-views
// https://www.sanity.io/docs/object-type definition
