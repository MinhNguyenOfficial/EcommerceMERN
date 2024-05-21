import { WrapperInputStyle } from './style'

const InputForm = (props) => {
    const { placeholder, ...rests } = props

    return (
        <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={props.onChange} />
    )
}

export default InputForm