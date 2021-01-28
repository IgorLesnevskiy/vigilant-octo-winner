import React, { useCallback, useState, useRef, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import "./UserInfo.scss";

const STATUS_MAX_LENGTH = 150;

function UserInfo(props) {
    const { name = "", defaultStatus = "", onUpdate = Function.prototype } = props;

    const statusTextRef = useRef(defaultStatus);
    const statusNodeRef = useRef(null);

    const [usedCharsAmount, updateUsedCharsAmount] = useState(0);
    const [isEditMode, updateEditMode] = useState(false);

    const handleStatusChange = useCallback((e) => {
        statusTextRef.current = e.target.value;

        updateUsedCharsAmount(sanitizeHtml(statusTextRef.current).length);
    }, []);

    const handleStatusKeyDown = useCallback((e) => {
        if (e.which && (e.which === 8 || e.which === 37 || e.which === 39)) {
            return true;
        }

        const currentInputLength = sanitizeHtml(statusTextRef.current).length;

        if (currentInputLength >= STATUS_MAX_LENGTH) {
            e.preventDefault();
        }
    }, []);

    const handleDocumentClick = useCallback((e) => {
        if (
            !e.target.closest(".personal-user-info__status-input") &&
            !e.target.closest(".personal-user-info__action")
        ) {
            updateEditMode(false);
        }
    }, []);

    const handleChangeStatusTriggerClick = useCallback(() => {
        updateEditMode((currentMode) => !currentMode);
    }, []);

    useEffect(() => {
        if (isEditMode) {
            statusNodeRef.current.focus();

            return;
        }

        onUpdate(statusTextRef.current);
    }, [isEditMode]);

    useEffect(() => {
        updateUsedCharsAmount(defaultStatus.length);

        statusNodeRef.current.oncontextmenu = () => false;
        statusNodeRef.current.onpaste = () => false;
        statusNodeRef.current.oncut = () => false;

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <div className={"personal-user-info"}>
            <div className={"personal-user-info__greetings"}>Здравствуйте,</div>

            <div className={"personal-user-info__info-wrapper"}>
                <div className={"personal-user-info__info"}>
                    <div className={"personal-user-info__name"}>{name}</div>
                    <a
                        href="#"
                        className={"personal-user-info__action link link--action"}
                        onClick={handleChangeStatusTriggerClick}>
                        {isEditMode ? "Сохранить" : "Сменить статус"}
                    </a>
                </div>

                <div className={"personal-user-info__status-box"}>
                    <ContentEditable
                        className={"personal-user-info__status-input"}
                        html={statusTextRef.current}
                        innerRef={statusNodeRef}
                        disabled={!isEditMode}
                        placeholder={"Введите статус..."}
                        onChange={handleStatusChange}
                        onKeyDown={handleStatusKeyDown}
                    />
                </div>
                {isEditMode && (
                    <div className={"personal-user-info__note"}>
                        Количество символом: {usedCharsAmount} / {STATUS_MAX_LENGTH}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserInfo;
