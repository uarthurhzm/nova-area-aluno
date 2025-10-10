const AlertText = ({ text }: { text: string }) => {
    return <span className="text-red-700 font-semibold dark:text-red-400">
        {text}
    </span>
}

export default AlertText;