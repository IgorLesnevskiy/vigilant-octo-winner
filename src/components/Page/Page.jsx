function Page(props) {
    return (
        <>
            <div className={"page"}>
                <div className={"page__inner"}>{props.children}</div>
            </div>
        </>
    );
}

export default Page;
