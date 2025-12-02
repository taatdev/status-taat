import React from "react";

interface Props {
    name: string;
    url: string;
    status: "UP" | "DOWN" | "CHECKING";
}

export const StatusCard: React.FC<Props> = ({ name, url, status }) => {
    return (
        <div className="status-card fade-in">
            <div className="status-header">
                <span className={`status-dot ${status?.toLowerCase()}`}></span>

                <span className={`status-badge ${status?.toLowerCase()}`}>
                    {status}
                </span>
            </div>

            <div className="status-body">
                <h3 className="status-title">{name}</h3>
                <p className="status-url">{url}</p>
            </div>
        </div>
    );
};
