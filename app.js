// Execute the following code after the page has fully loaded.
window.addEventListener("load", function () {
  // Select elements with specific classes.
  const mobile = document.querySelector(".mobile");
  const desktop = document.querySelector(".desktop");
  const user_name = document.querySelector(".nav_user_name");

  // Check the window width and adjust the display of elements accordingly.
  if (window.innerWidth < 768) {
    mobile.style.display = "block";
    desktop.style.display = "none";
    user_name.style.display = "none";
  } else {
    mobile.style.display = "none";
    desktop.style.display = "block";
  }
});

// Navigation User Menu functionality
const navbar_user = document.querySelector(".nav_user");
const navbar_user_dropdown = document.querySelector(".nav_user_dropdown");

// Toggle the visibility of the user menu dropdown when the user clicks on the user menu.
navbar_user.addEventListener("click", function () {
  const user_menu_item = navbar_user_dropdown.querySelectorAll("a");
  const isExpanded =
    navbar_user_dropdown.getAttribute("aria-expanded") === "true";

  // Toggle dropdown visibility and manage focus.
  if (isExpanded) {
    navbar_user_dropdown.setAttribute("aria-expanded", "false");
    navbar_user_dropdown.classList.add("inactive_dropdown");
    navbar_user.focus();
  } else {
    navbar_user_dropdown.setAttribute("aria-expanded", "true");
    navbar_user_dropdown.classList.remove("inactive_dropdown");

    // Focus on the first item in the dropdown.
    user_menu_item[0].focus();
  }
});

// Handle keyboard navigation in the user menu dropdown.
const user_menu_item = navbar_user_dropdown.querySelectorAll("a");
const items = [...user_menu_item];

user_menu_item.forEach((item) => {
  let last_index = user_menu_item.length - 1;
  const index = items.indexOf(item);

  // Move focus between items using arrow keys.
  item.addEventListener("keyup", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      // If at the last item, move back to the top;
      if (index >= last_index) user_menu_item[0].focus();
      else user_menu_item[index + 1].focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      if (index <= 0) user_menu_item[last_index].focus();
      else user_menu_item[index - 1].focus();
    }
  });

  // Listen for escape button event
  item.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
      navbar_user_dropdown.setAttribute("aria-expanded", "false");
      navbar_user_dropdown.classList.add("inactive_dropdown");
      navbar_user.focus();
    }
  });
});

// Navigation notification menu functionality
const navbar_notification = document.querySelector(".nav_notification");
const navbar_notification_dropdown = document.querySelector(
  ".nav_notification_dropdown"
);
const navbar_notification_item =
  navbar_notification_dropdown.querySelectorAll("ul a");

navbar_notification.addEventListener("click", function () {
  // Toggle dropdown visibility and manage focus.
  const isExpanded =
    navbar_notification_dropdown.getAttribute("aria-expanded") === "true";
  console.log(isExpanded);
  if (isExpanded) {
    navbar_notification_dropdown.setAttribute("aria-expanded", "false");
    navbar_notification_dropdown.classList.add("inactive_dropdown");
    navbar_notification.focus();
  } else {
    navbar_notification_dropdown.setAttribute("aria-expanded", "true");
    navbar_notification_dropdown.classList.remove("inactive_dropdown");
    console.log(navbar_notification_item);
    navbar_notification_item[0].focus();
  }
});

// Listen for escape events
navbar_notification_item.forEach((item) => {
  item.addEventListener("keyup", function (e) {
    console.log(e);
    if (e.key === "Escape") {
      navbar_notification_dropdown.setAttribute("aria-expanded", "false");
      navbar_notification_dropdown.classList.add("inactive_dropdown");
      navbar_notification.focus();
    }
  });
});

// Delete Select Plan Modal
const delete_plan_icon = document.querySelector(".select_plan_btn button");

delete_plan_icon.addEventListener("click", function () {
  // Hide the modal on button click
  const select_plan_modal = document.querySelector(".select_plan");
  select_plan_modal.classList.add("hide");
});

// Directional Icon functionality
const up_icon = document.querySelector(".up_icon");
const down_icon = document.querySelector(".down_icon");
const plans_container = document.querySelector(".plan_guide_plans");

// Toggle the visibility of plan elements and icons.
up_icon.addEventListener("click", function () {
  // Hide the up icon, plans container and show the down icon
  up_icon.classList.add("hide_icon");
  plans_container.classList.add("hide");
  down_icon.classList.remove("hide_icon");
  down_icon.focus();
});
down_icon.addEventListener("click", function () {
  // Show the up icon, plans container and hide the down icon
  up_icon.classList.remove("hide_icon");
  plans_container.classList.remove("hide");
  down_icon.classList.add("hide_icon");
  up_icon.focus();
});

// Plans functionality
const unselected_icon = document.querySelectorAll(".plan_guide_plan .svg");
let count = 0;

unselected_icon.forEach((icon) => {
  icon.addEventListener("click", function () {
    let rotate_icon, marked_icon;

    if (icon.classList.contains("unselected_svg")) {
      // If the icon is unselected, rotate it and mark it as selected after a delay
      rotate_icon = icon.nextElementSibling;
      marked_icon = rotate_icon.nextElementSibling;
      icon.classList.add("hide_icon");
      rotate_icon.classList.remove("hide_icon");

      setTimeout(function () {
        rotate_icon.classList.add("hide_icon");
        marked_icon.classList.remove("hide_icon");
        const icon_parent = icon.parentElement.parentElement.parentElement;
        const icon_parent_next_sibling = icon_parent.nextElementSibling;
        console.log(icon_parent);
        console.log(icon_parent_next_sibling);
        if (icon_parent_next_sibling) {
          // If there is a next sibling, update its state
          const next_element_body_text = document.querySelector(
            `.${icon_parent_next_sibling.classList[1]} .plan_guide_plan_body_text`
          );
          const next_element_body_text_image = document.querySelector(
            `.${icon_parent_next_sibling.classList[1]} .plan_guide_plan_image`
          );

          icon_parent_next_sibling.classList.remove("unselected");
          next_element_body_text.classList.remove("hide");
          next_element_body_text_image.classList.remove("hide");

          icon_parent.classList.add("unselected");
          document
            .querySelector(
              `.${icon_parent.classList[1]} .plan_guide_plan_body_text`
            )
            .classList.add("hide");
          document
            .querySelector(
              `.${icon_parent.classList[1]} .plan_guide_plan_image`
            )
            .classList.add("hide");
          console.log(icon_parent);
        } else {
          console.log("Nothing");
        }

        count += 1;
        document.querySelector(".plan_guide_completed_count").textContent =
          count;
        document.querySelector(
          ".plan_guide_completed_bar_fill"
        ).style.width = `${count * 20}%`;
      }, 300);
    } else {
      // If the icon is selected, unselect it and update the count and progress bar
      rotate_icon = icon.previousElementSibling;
      const unselected_svg_icon = rotate_icon.previousElementSibling;
      icon

.classList.add("hide_icon");
      unselected_svg_icon.classList.remove("hide_icon");

      count -= 1;
      document.querySelector(".plan_guide_completed_count").textContent = count;
      document.querySelector(".plan_guide_completed_bar_fill").style.width = `${
        count * 20
      }%`;
    }
  });
});

// Plan Guide functionality
const plan_header = document.querySelectorAll(".svg_icons button");
const plans = document.querySelectorAll(".plan_guide_plan");

plan_header.forEach((header) => {
  header.addEventListener("click", function() {
    // Call a function to handle the click event on plan headers
    headerButtonAction(header);
  })
  header.addEventListener("keyup", function(e) {
    // Call the same function if the "Enter" key is pressed
    if(e.key === "Enter") {
      headerButtonAction(header);
    }
  })
});

// Function to handle the click event on plan headers
const headerButtonAction = (header) => {
  let parent_body_text, parent_body_text_image;
  console.log(header)
  const header_parent = header.parentElement.parentElement.parentElement;

  // Hide other plans not currently clicked on
  if (header_parent.classList.contains("unselected")) {
    plans.forEach((plan) => {
      plan.classList.add("unselected");
      parent_body_text = document.querySelector(
        `.${plan.classList[1]} .plan_guide_plan_body_text`
      );
      parent_body_text_image = document.querySelector(
        `.${plan.classList[1]} .plan_guide_plan_image`
      );

      parent_body_text.classList.add("hide");
      parent_body_text_image.classList.add("hide");
    });
  }

  // Reassign the variables for another use
  parent_body_text = document.querySelector(
    `.${header_parent.classList[1]} .plan_guide_plan_body_text`
  );
  parent_body_text_image = document.querySelector(
    `.${header_parent.classList[1]} .plan_guide_plan_image`
  );

  // Show the clicked plan and its details
  header_parent.classList.remove("unselected");
  parent_body_text.classList.remove("hide");
  parent_body_text_image.classList.remove("hide");
}
