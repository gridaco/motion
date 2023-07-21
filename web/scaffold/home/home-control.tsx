import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  LightningBoltIcon,
  DownloadIcon,
  ShadowIcon,
  TransparencyGridIcon,
} from "@radix-ui/react-icons";

interface Preset {
  template: string;
  thumbnail: string;
  name: string;
}

const __presets: ReadonlyArray<Preset> = [
  {
    template: "004.1-bg-black",
    name: "Glass 2",
    thumbnail: "/lsd/preview/baked-004.1/lsd.jpeg",
  },
  {
    template: "003-3d-glass-dispersion-text",
    name: "Glass 1",
    thumbnail: "/lsd/preview/baked-001/0001.png",
  },
  // {
  //   template: "004.2-bg-transparent",
  //   name: "Glass 3",
  //   thumbnail: "/lsd/preview/baked-001/TEXT-b.gif",
  // },
];

const SnapWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export function Controller({
  showDownload,
  onDownload,
  onSubmit,
}: {
  showDownload?: boolean;
  onDownload?: () => void;
  onSubmit?: (
    e: React.FormEvent<HTMLFormElement>,
    options: {
      preset: string;
    }
  ) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [preset, setPreset] = useState("004.1-bg-black");

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        width: "100%",
        flexDirection: "column",
      }}
    >
      {expanded && (
        <Bar
          style={{
            height: "100%",
          }}
        >
          {__presets.map((it, i) => (
            <ItemContainer
              key={i}
              data-selected={preset === it.template}
              onClick={() => {
                setPreset(it.template);
              }}
            >
              <img src={it.thumbnail} width="100%" height="100%" />
            </ItemContainer>
          ))}
        </Bar>
      )}

      <ControllerWrapper>
        <Bar>
          <div
            className="slot scene"
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            <TransparencyGridIcon width="100%" height="100%" />
          </div>
          <form
            onSubmit={(e) => {
              setExpanded(false);
              e.preventDefault();
              onSubmit?.(e, {
                preset,
              });
            }}
          >
            <input
              id="body"
              type="text"
              placeholder="Type text to render"
              maxLength={7}
              autoFocus
              autoComplete="off"
            />
            <button type="submit">
              <LightningBoltIcon />
            </button>
          </form>
        </Bar>
        {showDownload && (
          <SnapWrapper
            onClick={() => {
              onDownload?.();
            }}
          >
            <DownloadIcon />
          </SnapWrapper>
        )}
      </ControllerWrapper>
    </div>
  );
}

const ItemContainer = styled.div`
  user-select: none;
  display: flex;
  color: black;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  background: black;

  &[data-selected="true"] {
    border: 2px solid white;
  }
`;

const Bar = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  flex-direction: row;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  gap: 16px;
  background: #232323;
`;

const ControllerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  .slot {
    display: flex;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  .slot.scene {
    cursor: pointer;
    height: 100%;
    aspect-ratio: 1 /1;
    color: white;
  }

  form {
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 16px;
  }

  input {
    flex: 1;
    width: 100%;
    padding: 8px;
    background: none;
    border: none;
    color: white;
    outline: none;
  }

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    background: none;
    border: none;
    color: white;
  }
`;
