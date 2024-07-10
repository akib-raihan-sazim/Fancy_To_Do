import { Button, Modal, Text, Group } from "@mantine/core";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
    >
      <Text>Are you sure you want to delete this task?</Text>
      <Group  mt="md">
        <Button onClick={onClose} variant="default">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="red">
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteConfirmationModal;
