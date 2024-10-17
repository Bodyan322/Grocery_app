import React, { memo, useRef, useState } from 'react';
import {
  Box,
  Checkbox,
  Text,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
} from "@gluestack-ui/themed";
import { useQueryClient, useMutation } from '@tanstack/react-query';
import {StyleSheet, TouchableOpacity} from "react-native";
import { Trash2 } from 'lucide-react-native';
import {deleteGrocery, IGrocery, markAsBought} from "../../api";
import ConfirmModal from "../shared/ConfirmModal";
import ItemForm from "../ItemForm";
import ModalWrapper from "../shared/ModalWrapper";

export interface Item  {
  item: IGrocery
}

const GroceryItem = ({ item }: Item) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const ref = useRef(null)
  const { mutate: handleBought} = useMutation({
    mutationFn: (isBought: boolean) => markAsBought(item.id, isBought),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
    },
    onError: (error, variables, context) => {
      console.log('onError')
    },
  })

  const { mutate: handleDelete} = useMutation({
    mutationFn: () => deleteGrocery(item.id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
    },
    onError: (error, variables, context) => {
      console.log('onError')
    },
  })

  return (
    <TouchableOpacity onPress={() => setShowModalForm(true)}>
      <Box style={styles.itemContainer} softShadow="4">
        <Checkbox
          value={item.name}
          size="md"
          isChecked={item.isBought || false}
          onChange={handleBought}
          sx={{
            ":checked": {
              _indicator: {
                color: "$white",
                bg: "#83BA77",
              },
            },
          }}
        >
          <CheckboxIndicator borderColor="#83BA77">
            <CheckboxIcon as={CheckIcon} color="white" />
          </CheckboxIndicator>
        </Checkbox>
        <Text style={[styles.itemText, item.isBought && styles.boughtText]}>
          {item.name} - {item.amount}
        </Text>
        <TouchableOpacity onPress={() => setShowModal(p => !p)}>
          <Trash2 size={24} color="#83BA77"/>
        </TouchableOpacity>
        <ModalWrapper
          isModalOpen={showModal}
          onCloseModal={() => setShowModal(p => !p)}>
          <ConfirmModal
            item={item}
            onClose={() => setShowModal(false)}
            onConfirm={handleDelete}
          />
        </ModalWrapper>
        <ModalWrapper
          isModalOpen={showModalForm}
          onCloseModal={() => setShowModalForm(p => !p)}>
          <ItemForm item={item} onClose={() => setShowModalForm(false)}/>
        </ModalWrapper>
      </Box>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    color: 'black',
  },
  boughtText: {
    textDecorationLine: 'line-through',
  },
  actionButton: {
    width: 20,
  }
});

export default memo(GroceryItem);
