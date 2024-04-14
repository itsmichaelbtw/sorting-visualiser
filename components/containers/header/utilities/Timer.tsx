import React, { useState, useEffect, useRef } from "react";

import { Button } from "components/ui/Button";
import { Utility } from "../components/Utility";

import { Clock } from "components/elements/Clock";

const SECOND = 1000;
const MINUTE = SECOND * 60;

interface Props {
  isRunning: boolean;
  onPause(): void;
  onContinue(): void;
  onStart(): void;
}

export function Timer({ isRunning, onPause, onStart }: Props) {
  function _onSort() {
    onStart();
  }

  function _onPause() {
    onPause();
  }

  function _onClick() {
    if (isRunning) {
      _onPause();
    } else {
      _onSort();
    }
  }

  return (
    <Utility fill={false}>
      <Button color={isRunning ? "yellow" : "green"} onClick={_onClick}>
        {isRunning ? "Pause" : "Sort"}
      </Button>
      <Utility.Node>
        <Clock startTimer={isRunning} clearOnStart={false} />
      </Utility.Node>
    </Utility>
  );
}
