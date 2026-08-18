import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteConfirmDialog = ({
  open,
  task,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          color: "error.main",
          fontWeight: 700,
        }}
      >
        🗑 Delete Task
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this task?
        </DialogContentText>

        <Typography
          sx={{
            mt: 2,
            fontWeight: 700,
          }}
        >
          {task?.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;