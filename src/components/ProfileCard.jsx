import React from "react";

const ProfileCard = ({ profile }) => {
    // console.log(`profilecard:`, profile);
    return (
        <div className="bg-white w-50 h-50 lg:w-1/2 p-4">
            <img src={profile.profile_image !== null ? profile.profile_image : "/assets/Profile Photo.png"} className="mb-5" alt="Profile" width={120} />
            <p>Selamat Datang,</p>
            <h1 className="text-4xl font-bold mb-4">{profile.first_name}</h1>
        </div>
    );
};

export default ProfileCard;
