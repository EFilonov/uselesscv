export interface Html2PdfOptions {
    margin?: number[] | number;
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: { scale?: number };
    jsPDF?: { unit?: string; format?: string; orientation?: string };
}

export interface Html2PdfInstance {
    set(options: Html2PdfOptions): Html2PdfInstance;
    from(element: HTMLElement | null): Html2PdfInstance;
    save(): void;
}
