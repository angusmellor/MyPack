import React from 'react';
import {DndContext, useDraggable} from '@dnd-kit/core';
import type {DropAnimation, Modifiers, Translate} from '@dnd-kit/core';




interface Props {

  dragOverlayModifiers?: Modifiers;
  dropAnimation?: DropAnimation | null;
  handle?: boolean;
  label?: string;
  modifiers?: Modifiers;
  style?: React.CSSProperties;
}

function DragOverlayExample({

  dropAnimation,
  handle,
  label,
  modifiers,
}: Props) {
  return (
    <DndContext modifiers={modifiers}>
      <Wrapper>
        <DraggableItem  handle={handle} label={label} />
      </Wrapper>
      <DraggableOverlay  dropAnimation={dropAnimation} />
    </DndContext>
  );
}

interface DraggableItemProps {

  label?: string;
  handle?: boolean;
  translate?: Translate;
}

function DraggableItem({ label}: DraggableItemProps) {
  const {setNodeRef, listeners, isDragging} = useDraggable({
    id: 'draggable-item',
  });

  return (
    <Draggable
      ref={setNodeRef}
      label={label}
      dragging={isDragging}
      listeners={listeners}
      style={{
        opacity: isDragging ? 0.5 : undefined,
      }}
    />
  );
}

export const BasicSetup = () => (
  <DragOverlayExample label="Drag me to see the <DragOverlay>" />
);

import  {forwardRef} from 'react';
import type {DraggableSyntheticListeners} from '@dnd-kit/core';
import type {Transform} from '@dnd-kit/utilities';


export enum Axis {
  All,
  Vertical,
  Horizontal,
}

interface Props {
  axis?: Axis;
  dragOverlay?: boolean;
  dragging?: boolean;
  handle?: boolean;
  label?: string;
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  transform?: Transform | null;
}

const Draggable = forwardRef<HTMLButtonElement, Props>(
  function Draggable(
    {
      axis,
      dragOverlay,
      dragging,
      handle,
      label,
      listeners,
      transform,
      style,
      buttonStyle,
      ...props
    },
    ref
  ) {
    return (
      <div
        className={
          styles.Draggable
        }
        style={
          {
            ...style,
            '--translate-x': `${transform?.x ?? 0}px`,
            '--translate-y': `${transform?.y ?? 0}px`,
          } as React.CSSProperties
        }
      >
        <button
          {...props}
          aria-label="Draggable"
          data-cypress="draggable-item"
          {...(handle ? {} : listeners)}
          tabIndex={handle ? -1 : undefined}
          ref={ref}
          style={buttonStyle}
        >
         
          {/* {handle ? <Handle {...(handle ? listeners : {})} /> : null} */}
        </button>
        {label ? <label>{label}</label> : null}
      </div>
    );
  }
);

import {ComponentProps} from 'react';
import {createPortal} from 'react-dom';
import {DragOverlay, useDndContext} from '@dnd-kit/core';

import {CSS} from '@dnd-kit/utilities';


const dropAnimationConfig: DropAnimation = {
  keyframes({transform}) {
    return [
      {transform: CSS.Transform.toString(transform.initial)},
      {
        transform: CSS.Transform.toString({
          ...transform.final,
          scaleX: 0.94,
          scaleY: 0.94,
        }),
      },
    ];
  },
  sideEffects({active, dragOverlay}) {
    active.node.style.opacity = '0';

    const button = dragOverlay.node.querySelector('button');

    if (button) {
      button.animate(
        [
          {
            boxShadow:
              '-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)',
          },
          {
            boxShadow:
              '-1px 0 15px 0 rgba(34, 33, 81, 0), 0px 15px 15px 0 rgba(34, 33, 81, 0)',
          },
        ],
        {
          duration: 250,
          easing: 'ease',
          fill: 'forwards',
        }
      );
    }

    return () => {
      active.node.style.opacity = '';
    };
  },
};

interface Props {
  axis?: ComponentProps<typeof Draggable>['axis'];
  dropAnimation?: DropAnimation | null;
}

function DraggableOverlay({
  axis,
  dropAnimation = dropAnimationConfig,
}: Props) {
  const {active} = useDndContext();

  return createPortal(
    <DragOverlay dropAnimation={dropAnimation}>
      {active ? <Draggable axis={axis} dragging dragOverlay /> : null}
    </DragOverlay>,
    document.body
  );
}


interface WProps {
  children: React.ReactNode;
  center?: boolean;
  style?: React.CSSProperties;
}

function Wrapper({children, center, style}: WProps) {
  return (
    <div
      style={style}
    >
      {children}
    </div>
  );
}