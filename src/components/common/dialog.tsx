import * as ModalPrimitive from "@radix-ui/react-dialog";

interface DefaultDialogProps {
  isOpen: boolean;
  onOpenChange: (bool: boolean) => void;
  children?: React.ReactNode;
  overlay?: boolean;
}

const DialogDefault = ({
  onOpenChange,
  isOpen,
  overlay,
  children,
}: DefaultDialogProps) => (
  <ModalPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
    <ModalPrimitive.Portal>
      {overlay && (
        <ModalPrimitive.Overlay className=" fixed left-[50%]  top-0 z-50  h-screen w-full translate-x-[-50%] bg-neutral-black opacity-40" />
      )}
      <ModalPrimitive.Title />
      <ModalPrimitive.Content className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] focus:outline-none">
        {children}
      </ModalPrimitive.Content>
    </ModalPrimitive.Portal>
  </ModalPrimitive.Root>
);
export default DialogDefault;
