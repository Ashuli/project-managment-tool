
export const useOutsideClick = ($root, $bound, onOutsideClick) => {
  const handleClickOutside = (e) => {
    if ($bound && !$bound.contains(e.target)) {
      onOutsideClick()
    }
  }
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      onOutsideClick()
    }
  }
  const mounted = (() => {
    ;($root).addEventListener('mousedown', handleClickOutside)
    ;($root).addEventListener('keydown', handleKeydown)
  })
  mounted()
}
