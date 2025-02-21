import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";


interface CommonModalType {
    backdrop?: boolean | "static";
    centered?: boolean;
    size?: "sm" | "lg" | "xl" | "xxl";
    isOpen: boolean;
    toggle: () => void;
    title?: string;
    onClosed?: () => void;
    sizeTitle?: string;
    fullTitle?: string;
    modalBodyClassName?: string;
    children: React.ReactNode;
}

const CommonModal:React.FC<CommonModalType> = ({backdrop, centered, size, isOpen, toggle, title, onClosed, sizeTitle, fullTitle, modalBodyClassName, children } ) => {
    return (
        <Modal backdrop={backdrop} centered={centered} size={size} isOpen={isOpen} toggle={toggle} onClosed={onClosed}>
            {(title || sizeTitle || fullTitle) && (
                <div className="modal-header" onClick={toggle}>
                    {title && <h5 className="f-w-600">{title}</h5>}
                    {sizeTitle && <h4>{sizeTitle}</h4>}
                    {fullTitle && <h1 className="fs-5">{fullTitle}</h1>}
                    <Button close></Button>
                </div>
            )}
            <ModalBody className={modalBodyClassName ? modalBodyClassName : ""}>{children}</ModalBody>

        </Modal>
    );
};

export default CommonModal;