import React from 'react';
import "./AnnouncementsPreview.css"
import { MdCampaign, MdArrowForward } from "react-icons/md";
import { announcementList } from '../../lib/placeholder';

function AnnouncementsPreview () {
    return (
        <div className="ancmt-preview_content-wrapper card-p">
            <div className="ancmt-preview_title rpr">
                <MdCampaign className="ancmt-preview_icon" />
                <h2>Announcements</h2>
            </div>
            <div className="ancmt-preview_content">
                {announcementList.map((item, index) => (
                    <div key={index} className='ancmt-preview_list-item'>
                        <h4 className="rpr">{item['title']}</h4>
                        <p className="osns color-grey">{item['content']}</p>
                        {index < announcementList.length-1 && <hr className="color-grey"/>}
                    </div>
                ))}
            </div>
            <div className="ancmt-preview_view-all">
                <a href="/announcements">View all annoucements <MdArrowForward /></a>
            </div>
        </div>
    );
}

export default AnnouncementsPreview;