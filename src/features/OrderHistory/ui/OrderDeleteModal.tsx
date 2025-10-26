import { Button } from '@/shadcn/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog'
import { Spinner } from '@/shadcn/components/ui/spinner'
import { OrderService } from '@/src/entities/Order'
import { DialogDescription, DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

export interface OrderDeleteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: string
}

export const OrderDeleteModal = ({
  open,
  onOpenChange,
  orderId,
}: OrderDeleteModalProps) => {
  const queryClient = useQueryClient()
  const { mutate: deleteOrder, isPending: isDeletingOrder } = useMutation({
    mutationFn: (orderId: string) => OrderService.deleteOrder(orderId),
    onSuccess: () => {
      toast.success('Order deleted successfully')
      onOpenChange(false)
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: () => {
      toast.error('Failed to delete order')
      onOpenChange(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="rounded-none">
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this order?
          </DialogDescription>
          <DialogFooter>
            <Button
              disabled={isDeletingOrder}
              variant="default"
              onClick={(e) => {
                e.stopPropagation()
                deleteOrder(orderId)
              }}
            >
              {isDeletingOrder ? <Spinner /> : 'Delete'}
            </Button>
            <Button
              disabled={isDeletingOrder}
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation()
                onOpenChange(false)
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
