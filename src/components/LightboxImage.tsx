import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

interface LightboxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export function LightboxImage({ src, alt, style, ...rest }: LightboxImageProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={{ cursor: 'zoom-in', ...style }}
        onClick={() => setOpen(true)}
        {...rest}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              background: 'transparent',
              boxShadow: 'none',
              overflow: 'visible',
              m: 2,
            },
          },
        }}
        sx={{
          '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.85)' },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          size="small"
          sx={{
            position: 'absolute',
            top: -16,
            right: -16,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: 'common.white',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
            zIndex: 1,
          }}
          aria-label="Close image"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <DialogContent sx={{ p: 0, overflow: 'visible', lineHeight: 0 }}>
          <img
            src={src}
            alt={alt}
            style={{
              display: 'block',
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 4,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
