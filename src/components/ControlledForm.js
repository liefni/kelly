import {createContext, useCallback, useContext} from 'react'
import {TextField} from '@mui/material'

const FormContext = createContext()

const ControlledForm = (props) => {
  const {data, onChange, onSubmit, children, errors, ...rest} = props

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    onSubmit(e)
  })

  const handleChange = useCallback((newData) => {
    onChange((prev) => ({...prev, ...newData}))
  }, [onChange])

  const context = {data, onDataChange: handleChange, errors}

  return (
    <FormContext.Provider value={context}>
      <form onSubmit={handleSubmit} {...rest}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export default ControlledForm

export const Input = (props) => {
  const {component: Component = TextField, name, ...rest} = props

  const {data, onDataChange, errors} = useContext(FormContext)

  const value = data[name] || ''
  const handleChange = useCallback((e) => {
    onDataChange({[name]: e.target.value})
  }, [name, onDataChange])

  const errorText = errors[name]?.join(', ')

  return (
    <Component name={name} value={value} onChange={handleChange} helperText={errorText} error={!!errorText} {...rest} />
  )
}