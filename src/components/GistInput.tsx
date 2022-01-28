import React from 'react';
import { FormFieldPresence } from '@sanity/base/presence'
import { FormBuilderInput } from '@sanity/form-builder/lib/FormBuilderInput'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import { setIfMissing } from '@sanity/form-builder/PatchEvent'
import { Marker, Path, SchemaType } from '@sanity/types'

export interface GistValue {
  _type?: 'github.gist'
  id?: string
  file?: string
}

export interface GistType {
  name?: string
  title?: string
  description?: string
  fields: {name: string; title?: string; placeholder?: string, type: SchemaType }[]
  options?: {
    hotspot?: boolean
  }
}
export interface GistInputProps {
  type: GistType,
  value?: GistValue,
  compareValue?: GistValue,
  focusPath: Path,
  markers: Marker[],
  presence: FormFieldPresence[],
  onBlur: () => void,
  onChange: (...args: any[]) => void,
  onFocus: (path: Path) => void,
  level: number
}

const GistInput = React.forwardRef(
  (props: GistInputProps, ref: React.ForwardedRef<{ focus: () => void }>) => {

    console.log(props)

    const {
      type,         // Schema information
      value,        // Current field value
      compareValue, // Value to check for "edited" functionality
      focusPath,    // focus Path
    //   readOnly,     // Boolean if field is not editable
    //   placeholder,  // Placeholder text from the schema
      markers,      // Markers including validation rules
      presence,     // Presence information for collaborative avatars
      onFocus,      // Method to handle focus state
      onBlur,       // Method to handle blur state
      onChange,      // Method to handle patch events
      level
    } = props

    const handleFieldChange = React.useCallback(
      (field, fieldPatchEvent) => {
        // fieldPatchEvent is an array of patches
        // Patches look like this:
        /*
            {
                type: "set|unset|setIfMissing",
                path: ["fieldName"], // An array of fields
                value: "Some value" // a value to change to
            }
        */
        onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({ _type: type.name })))
      },
      [onChange]
    )

    // Get an array of field names for use in a few instances in the code
    const fieldNames = type.fields.map((f) => f.name)

    // If Presence exist, get the presence as an array for the children of this field
    const childPresence =
      presence.length === 0
        ? presence
        : presence.filter((item) => fieldNames.includes(item.path[0]))

    // If Markers exist, get the markers as an array for the children of this field
    const childMarkers =
      markers.length === 0 
        ? markers 
        : markers.filter((item) => fieldNames.includes(item.path[0]))

    return (
      <Fieldset
        legend={type.title} // schema title
        description={type.description} // schema description
        markers={childMarkers} // markers built above
        presence={childPresence} // presence built above
      >
        {type.fields.map((field, i) => {
          return (
            // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
            // for the given field type
            <FormBuilderInput
              level={level + 1}
              ref={i === 0 ? ref : null}
              key={field.name}
              type={field.type}
              value={value && value[field.name]}
              onChange={(patchEvent) => handleFieldChange(field, patchEvent)}
              path={[field.name]}
              markers={markers}
              focusPath={focusPath}
              readOnly={field.type.readOnly}
              presence={presence}
              onFocus={onFocus}
              onBlur={onBlur}
              compareValue={compareValue}
            />
          )
        })}
      </Fieldset>
    )
  }
)

GistInput.displayName = 'GistInput'

export default GistInput
