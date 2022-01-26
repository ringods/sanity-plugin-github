import React from 'react';
import { FormField } from '@sanity/base/components';
import { Label, Text, TextInput } from '@sanity/ui';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'

import { useId } from "@reach/auto-id" // hook to generate unique IDs

export interface GistValue {
  _type?: 'github.gist'
  id?: string
  file?: string
}

export interface GistType {
  name?: string
  title?: string
  description?: string
  fields: {name: string; title?: string; placeholder?: string}[]
  options?: {
    hotspot?: boolean
  }
}
export interface GistInputProps {
  type: GistType,
  value: GistValue,
}

const GistInput = React.forwardRef(
  (props: GistInputProps, ref: React.ForwardedRef<{ focus: () => void }>) => {

    console.log(props)

    const {
      type,         // Schema information
      value,        // Current field value
    } = props

    return (
      <FormField
        description={type.description}  // Creates description from schema
        title={type.title}              // Creates label from schema title
      >
        <TextInput
          value={value.id}              // Current field value
        />
      </FormField>
    )
  }
)

GistInput.displayName = 'GistInput'

export default GistInput
