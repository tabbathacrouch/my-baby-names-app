import emailjs from "emailjs-com";

export const sendResultsEmail = async (
  fromName: string,
  likedNames: string[],
  dislikedNames: string[],
  userEmail?: string
) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
  const defaultEmail = import.meta.env.VITE_API_DEFAULT_EMAIL;

  if (!serviceId || !templateId || !publicKey) {
    console.error("Missing EmailJS environment variables");
    return false;
  }

  // Format the names as properly formatted HTML lists
  const likedList =
    likedNames.length > 0
      ? likedNames.map((name) => `<li>${name}</li>`).join("")
      : "<li>No liked names</li>";

  const dislikedList =
    dislikedNames.length > 0
      ? dislikedNames.map((name) => `<li>${name}</li>`).join("")
      : "<li>No disliked names</li>";

  // Prepare the recipient list
  const toEmails = [defaultEmail];
  if (userEmail) {
    toEmails.push(userEmail.trim());
  }

  const templateParams = {
    from_name: fromName,
    liked_names: likedList,
    disliked_names: dislikedList,
    to_emails: toEmails.join(",").trim(),
  };

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );
    console.log("Email sent successfully:", response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
