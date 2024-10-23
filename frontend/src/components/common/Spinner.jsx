const Spinner = ({ size = "md", bg = 'black' }) => {
    const sizeClass = `loading-${size}`;

    return <span className={`mx-auto loading loading-spinner ${sizeClass} bg-[${bg}]`} />;
};
export default Spinner;
