import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ButtonText,
  Text,
  CloseIcon,
  Heading,
  Icon,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@gluestack-ui/themed";
import { IGrocery } from "../../../api";

interface IProps {
  item: IGrocery;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({ item, onClose, onConfirm }: IProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  }

  return (
    <ModalContent>
      <ModalHeader>
        <Heading size="lg">Delete Item</Heading>
        <ModalCloseButton>
          <Icon as={CloseIcon} />
        </ModalCloseButton>
      </ModalHeader>
      <ModalBody>
        <Text size="sm">
         Do you want to delete the {item?.name} item ?
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="outline"
          size="sm"
          action="secondary"
          mr="$3"
          onPress={onClose}
        >
          <ButtonText>Cancel</ButtonText>
        </Button>
        <Button
          size="sm"
          action="primary"
          onPress={handleConfirm}
          bg="$error700"
        >
          <ButtonText>Confirm</ButtonText>
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'red',
  }
});

export default ConfirmModal;
