import React from "react";
import { useHistory } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import {
  useGetInvitationInfoQuery,
  useAcceptInvitationMutation,
} from "graphql/generated/graphql";

import { Button } from "@convoy-ui";
import Loading from "components/Loading";

import ConvoyLogo from "components/ConvoyLogo";
import HomeWrapper from "../HomeWrapper.style";

function Invitation({ match }) {
  const history = useHistory();
  const [
    acceptInvitation,
    { loading: acceptInvitationLoading },
  ] = useAcceptInvitationMutation({
    variables: { token: match.params.token },
    onCompleted() {
      history.push("/");
    },
  });

  const {
    data: invite,
    loading: inviteLoading,
    error: inviteError,
  } = useGetInvitationInfoQuery({
    variables: { token: match.params.token },
  });

  const isLoading = inviteLoading;
  return (
    <HomeWrapper>
      <ConvoyLogo />
      <div className="wrapper_card">
        {inviteError ? (
          <p>Invalid Invitation</p>
        ) : isLoading ? (
          <Loading />
        ) : (
          <div>
            <h2>
              Invitation from{" "}
              <span className="textcolor--primary">
                {invite?.getInvitationInfo?.room?.name}
              </span>
            </h2>
            <p>
              {invite?.getInvitationInfo?.invitedBy?.name} Invited you to join
              {invite?.getInvitationInfo?.room?.name}, join their community now!
            </p>
            <Button
              isLoading={acceptInvitationLoading}
              icon={FaThumbsUp}
              onClick={acceptInvitation}
            >
              Accept Invitation
            </Button>
          </div>
        )}
      </div>
    </HomeWrapper>
  );
}

export default Invitation;
