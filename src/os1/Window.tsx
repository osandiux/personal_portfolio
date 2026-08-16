import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';

type WindowFrameProps = {
  title: string;
  zIndex: number;
  maximized: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  width?: number;
  height?: number;
  offset: number;
  children: ReactNode;
};

export function WindowFrame({
  title,
  zIndex,
  maximized,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  width = 720,
  height = 480,
  offset,
  children,
}: WindowFrameProps) {
  const nodeRef = useRef<HTMLElement>(null);
  const dragRef = useRef({ pointer: 0, originX: 0, originY: 0, startX: 0, startY: 0 });
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || maximized) return;
    if ((event.target as HTMLElement).closest('.os1-traffic')) return;
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const parent = (node.offsetParent as HTMLElement | null)?.getBoundingClientRect();
    const x = rect.left - (parent?.left ?? 0);
    const y = rect.top - (parent?.top ?? 0);
    dragRef.current = { pointer: event.pointerId, originX: event.clientX, originY: event.clientY, startX: x, startY: y };
    setPos({ x, y });
    node.setPointerCapture(event.pointerId);

    const move = (next: PointerEvent) => {
      const nextPos = {
        x: dragRef.current.startX + next.clientX - dragRef.current.originX,
        y: dragRef.current.startY + next.clientY - dragRef.current.originY,
      };
      node.style.left = `${nextPos.x}px`;
      node.style.top = `${nextPos.y}px`;
    };
    const up = () => {
      const left = Number.parseFloat(node.style.left);
      const top = Number.parseFloat(node.style.top);
      if (Number.isFinite(left) && Number.isFinite(top)) setPos({ x: left, y: top });
      node.releasePointerCapture(event.pointerId);
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerup', up);
    };
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerup', up);
  };

  return (
    <section
      ref={nodeRef}
      className={`os1-window${maximized ? ' is-max' : ''}`}
      style={{
        zIndex,
        width,
        height,
        left: pos ? pos.x : `calc(50% - ${width / 2}px + ${offset}px)`,
        top: pos ? pos.y : `calc(12% + ${offset}px)`,
      }}
      onPointerDown={onFocus}
    >
      <div className="os1-titlebar" onPointerDown={onDrag}>
        <div className="os1-traffic">
          <button type="button" className="os1-traffic__close" aria-label="Close" onClick={onClose} />
          <button type="button" className="os1-traffic__min" aria-label="Minimize" onClick={onMinimize} />
          <button type="button" className="os1-traffic__max" aria-label="Zoom" onClick={onMaximize} />
        </div>
        <h2>{title}</h2>
      </div>
      <div className="os1-body">{children}</div>
    </section>
  );
}
