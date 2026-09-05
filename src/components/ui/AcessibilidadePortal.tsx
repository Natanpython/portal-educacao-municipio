"use client";

import Script from "next/script";
import { Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => unknown;
    };
  }
}

declare module "react" {
  // O genérico precisa manter a mesma assinatura dos tipos nativos do React.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    vw?: string;
    "vw-access-button"?: string;
    "vw-plugin-wrapper"?: string;
  }
}

const TEXT_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "a",
  "button",
  "label",
  "li",
  "dt",
  "dd",
  "figcaption",
  "blockquote",
  "td",
  "th",
  "input",
  "textarea",
  "img",
].join(",");

function getReadableText(element: Element) {
  if (element.closest("[data-a11y-ignore]")) return "";

  if (element instanceof HTMLImageElement) return element.alt.trim();

  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    return (
      element.getAttribute("aria-label") ||
      element.placeholder ||
      element.value
    ).trim();
  }

  return (
    element.getAttribute("aria-label") ||
    element.textContent ||
    ""
  )
    .replace(/\s+/g, " ")
    .trim();
}

export default function AcessibilidadePortal() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeElement = useRef<Element | null>(null);
  const lastSpoken = useRef("");

  useEffect(() => {
    const restorePreference = window.setTimeout(() => {
      setAudioEnabled(localStorage.getItem("portal-audio") === "true");
    }, 0);
    return () => window.clearTimeout(restorePreference);
  }, []);

  const stopReading = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
    window.speechSynthesis?.cancel();
    activeElement.current?.classList.remove("a11y-reading-target");
    activeElement.current = null;
  }, []);

  useEffect(() => {
    if (!audioEnabled || !("speechSynthesis" in window)) {
      stopReading();
      return;
    }

    const readElement = (target: EventTarget | null, delay = 320) => {
      if (!(target instanceof Element)) return;
      const element = target.closest(TEXT_SELECTOR);
      if (!element) return;

      const text = getReadableText(element);
      if (!text || text === lastSpoken.current || text.length > 900) return;

      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      activeElement.current?.classList.remove("a11y-reading-target");
      activeElement.current = element;
      element.classList.add("a11y-reading-target");

      hoverTimer.current = setTimeout(() => {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "pt-BR";
        speech.rate = 0.95;
        speech.onend = () => element.classList.remove("a11y-reading-target");
        speech.onerror = () => element.classList.remove("a11y-reading-target");
        lastSpoken.current = text;
        window.speechSynthesis.speak(speech);
      }, delay);
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        readElement(event.target);
      }
    };
    const handleFocus = (event: FocusEvent) => readElement(event.target, 80);

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("focusin", handleFocus);
    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("focusin", handleFocus);
      stopReading();
    };
  }, [audioEnabled, stopReading]);

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    localStorage.setItem("portal-audio", String(nextState));
    if (!nextState) stopReading();
  };

  const initializeVlibras = () => {
    if (!window.VLibras || document.documentElement.dataset.vlibrasReady) return;
    new window.VLibras.Widget("https://vlibras.gov.br/app");
    document.documentElement.dataset.vlibrasReady = "true";
  };

  return (
    <>
      <div
        className="portal-audio-access"
        data-a11y-ignore
      >
        <button
          type="button"
          onClick={toggleAudio}
          aria-pressed={audioEnabled}
          aria-label={audioEnabled ? "Desativar leitura em áudio" : "Ativar leitura em áudio"}
          title={audioEnabled ? "Desativar leitura em áudio" : "Ativar leitura em áudio"}
          className={`portal-audio-button ${audioEnabled ? "is-active" : ""}`}
        >
          <Volume2 size={24} aria-hidden="true" />
          <span className="sr-only">{audioEnabled ? "Áudio ativado" : "Áudio desativado"}</span>
        </button>
      </div>

      <div vw="true" className="enabled" data-a11y-ignore>
        <div vw-access-button="true" className="active" />
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper" />
        </div>
      </div>

      <Script
        id="vlibras-plugin"
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onLoad={initializeVlibras}
        onReady={initializeVlibras}
      />
    </>
  );
}
