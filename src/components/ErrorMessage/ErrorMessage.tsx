import css from "./ErrorMessage.module.css"

export default function ErrorMessage() {
    return <>
        <p className={css.error}>Something was wrong... Please, try again</p>
    </>
}