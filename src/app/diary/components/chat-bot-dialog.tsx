import DialogDefault from "@/components/common/dialog";
import CloseIcon from "#/icons/ic-close.svg";
export default function ChatBotDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <DialogDefault isOpen={isOpen} onClose={onClose} overlay>
      <div className="bg-white w-400 h-500 rounded-20 p-20">
        <button
          className="flex w-full justify-end focus:outline-none"
          onClick={onClose}
        >
          <CloseIcon alt="닫기 아이콘" />
        </button>
      </div>
    </DialogDefault>
  );
}
import EmogiIcon from "asset/icons/EmogiIcon.svg";
import AudioIcon from "asset/icons/AudioIcon.svg";
import SendIcon from "asset/icons/SendIcon.svg";
import CloseIcon from "asset/icons/CloseIcon.svg";
