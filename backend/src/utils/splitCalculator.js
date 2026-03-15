<<<<<<< HEAD
=======
const toPlain = (member) =>
  typeof member.toObject === 'function' ? member.toObject() : member;

>>>>>>> repo2/main
const calculateSplit = (share, overrides = []) => {
  const activeMembers = share.members.filter((m) => m.status === 'joined');
  if (!activeMembers.length) return [];

  if (share.splitType === 'equal') {
    const amount = Number((share.totalAmount / activeMembers.length).toFixed(2));
    return activeMembers.map((member) => ({
<<<<<<< HEAD
      ...(typeof member.toObject === 'function' ? member.toObject() : member),
=======
      ...toPlain(member),
>>>>>>> repo2/main
      share: amount,
    }));
  }

  if (share.splitType === 'percentage') {
    return activeMembers.map((member) => {
      const override = overrides.find((o) => o.userId === member.user.toString());
<<<<<<< HEAD
      const pct = override?.percentage || member.percentage || 0;
  const base = typeof member.toObject === 'function' ? member.toObject() : member;
  return { ...base, share: Number(((pct / 100) * share.totalAmount).toFixed(2)) };
=======
      const pct = override?.percentage ?? member.percentage ?? 0;
      return {
        ...toPlain(member),
        share: Number(((pct / 100) * share.totalAmount).toFixed(2)),
      };
>>>>>>> repo2/main
    });
  }

  // Custom split with host contribution
<<<<<<< HEAD
  return activeMembers.map((member) => {
    const override = overrides.find((o) => o.userId === member.user.toString());
    const base = typeof member.toObject === 'function' ? member.toObject() : member;
    
    const otherMembersCount = activeMembers.filter(m => m.user.toString() !== share.host.toString()).length;
    
    // If member is the host
    if (member.user.toString() === share.host.toString()) {
      // If host is the only member, they pay the full amount
      if (otherMembersCount === 0) {
        return { ...base, share: Number(share.totalAmount.toFixed(2)) };
      }
      // Otherwise, use host contribution amount
      const hostAmount = share.hostContribution || 0;
      return { ...base, share: Number(hostAmount.toFixed(2)) };
    }
    
    // For other members, calculate remaining amount divided equally
    const hostAmount = share.hostContribution || 0;
    const remainingAmount = share.totalAmount - hostAmount;
    const equalShare = otherMembersCount > 0 ? Number((remainingAmount / otherMembersCount).toFixed(2)) : 0;
    
    return { ...base, share: override?.share || equalShare };
=======
  const hostId = share.host.toString();
  const otherMembersCount = activeMembers.filter((m) => m.user.toString() !== hostId).length;
  const hostAmount = share.hostContribution ?? 0;
  const remainingAmount = share.totalAmount - hostAmount;
  const equalShare = otherMembersCount > 0
    ? Number((remainingAmount / otherMembersCount).toFixed(2))
    : 0;

  return activeMembers.map((member) => {
    const override = overrides.find((o) => o.userId === member.user.toString());
    const base = toPlain(member);

    if (member.user.toString() === hostId) {
      if (otherMembersCount === 0) {
        return { ...base, share: Number(share.totalAmount.toFixed(2)) };
      }
      return { ...base, share: Number(hostAmount.toFixed(2)) };
    }

    return { ...base, share: override?.share ?? equalShare };
>>>>>>> repo2/main
  });
};

module.exports = { calculateSplit };
