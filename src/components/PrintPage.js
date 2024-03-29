import html2canvas from "html2canvas";

const PrintPage = () => {

    function MdiPrinterOutline(props) {
        return (
            <svg viewBox="0 0 24 24" {...props}>
                <path
                    d="M19 8c1.66 0 3 1.34 3 3v6h-4v4H6v-4H2v-6c0-1.66 1.34-3 3-3h1V3h12v5h1M8 5v3h8V5H8m8 14v-4H8v4h8m2-4h2v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4h2v-2h12v2m1-3.5c0 .55-.45 1-1 1s-1-.45-1-1s.45-1 1-1s1 .45 1 1z"
                    fill="currentColor"></path>
            </svg>
        )
    }

    function makeCanvas() {
        html2canvas(document.querySelector('.stat-grid'), {
            allowTaint: true,
        }).then(canvas => {
            const image = canvas.toDataURL("image/png");
            window.open(image, '_blank')
        })
    }

    return (
        <div className="flex items-center mr-4">
            <button onClick={makeCanvas}>
                <MdiPrinterOutline className="w-6 h-6"/>
            </button>
        </div>
    )
}
export default PrintPage
