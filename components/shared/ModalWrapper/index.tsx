import { Modal, ModalBackdrop, KeyboardAvoidingView } from "@gluestack-ui/themed";
import React,  {PropsWithChildren } from "react";
import {Platform} from "react-native";

interface IProps {
  isModalOpen: boolean;
  onCloseModal: () => void
}
const ModalWrapper: React.FC<PropsWithChildren<IProps>> = ({ isModalOpen, onCloseModal, children }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onCloseModal}
    >
      <ModalBackdrop/>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={20}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems:'center', justifyContent:'center'}}
      >
        {children}
      </KeyboardAvoidingView>
    </Modal>
    )

}

export default ModalWrapper;
