'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore make web strict
import ReactSelect, { createFilter, GroupBase } from 'react-select'

import {
  Menu,
  Option,
  IndicatorsContainer,
  Control,
  DropdownIndicator,
  Input,
  Placeholder,
  SingleValue,
  ValueContainer,
  MultiValue,
  MultiValueLabel,
  customStyles,
  NoOptionsMessage,
  ClearIndicator,
} from './Components'
import { Option as OptionType, SelectProps } from './Select.types'

import * as styles from './Select.css'

export const Select = <
  Value,
  IsMulti extends boolean = false,
  Group extends GroupBase<OptionType<Value>> = GroupBase<OptionType<Value>>,
>({
  name,
  id = name,
  isDisabled,
  noOptionsMessage,
  options,
  onChange,
  label,
  value,
  hasError = false,
  errorMessage = '',
  placeholder = '',
  defaultValue,
  isSearchable = true,
  isMulti,
  closeMenuOnSelect = !isMulti,
  backgroundColor = 'white',
  required,
  formatGroupLabel,
  isClearable,
  filterConfig,
  isLoading = false,
  hideSelectedOptions,
}: SelectProps<OptionType<Value>, IsMulti, Group>) => {
  const errorId = `${id}-error`
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => setIsMounted(true), [])

  return isMounted ? (
    <div
      className={cn(styles.wrapper, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore make web strict
        [styles.wrapperColor[backgroundColor]]: !isDisabled,
        [styles.containerDisabled]: isDisabled,
      })}
    >
      <ReactSelect<OptionType<Value>, IsMulti, Group>
        instanceId={id}
        aria-labelledby={id}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={hasError ? errorId : undefined}
        noOptionsMessage={() => noOptionsMessage || null}
        id={id}
        isLoading={isLoading}
        name={name}
        isDisabled={isDisabled}
        styles={customStyles()}
        classNamePrefix="island-select"
        onChange={onChange}
        options={options}
        // @ts-expect-error: extra props
        label={label}
        value={value}
        // icon={icon}
        placeholder={placeholder}
        isMulti={isMulti}
        closeMenuOnSelect={closeMenuOnSelect}
        defaultValue={defaultValue}
        isOptionDisabled={(option) => !!option.disabled}
        // hasError={hasError}
        isSearchable={isSearchable}
        // size={size}
        required={required}
        formatGroupLabel={formatGroupLabel}
        filterOption={createFilter(filterConfig)}
        hideSelectedOptions={hideSelectedOptions}
        components={{
          ValueContainer,
          Control,
          Input,
          Placeholder,
          SingleValue,
          DropdownIndicator,
          IndicatorsContainer,
          Option,
          Menu,
          MultiValue,
          MultiValueLabel,
          ClearIndicator,
          NoOptionsMessage,
        }}
        isClearable={isClearable}
        backspaceRemovesValue={isClearable}
        menuShouldScrollIntoView={false}
      />
      {hasError && errorMessage && (
        <div id={errorId} className={styles.errorMessage} aria-live="assertive">
          {errorMessage}
        </div>
      )}
    </div>
  ) : null
}
