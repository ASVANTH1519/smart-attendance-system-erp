import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export function Modal({ open, onOpenChange, title, children }: { open: boolean; onOpenChange: (v: boolean) => void; title?: string; children: React.ReactNode }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[min(720px,92%)] -translate-x-1/2 -translate-y-1/2 rounded-xxl-24 frosted shadow-card-2 p-6">
          {title && <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>}
          <div className="mt-4">{children}</div>
          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close asChild><button className="px-4 py-2 rounded-lg">Cancel</button></Dialog.Close>
            <button className="px-4 py-2 rounded-lg bg-[var(--primary-500)] text-white">Save</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
